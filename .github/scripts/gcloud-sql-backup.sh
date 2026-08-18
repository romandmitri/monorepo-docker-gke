#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/../../scripts/common/utility.sh"

log_script_start "$0"

INSTANCE=$(argument_extract "--instance" "$@") && (argument_display "--instance" true "$@")
PROJECT=$(argument_extract "--project" "$@") && (argument_display "--project" true "$@")
LIMIT=$(argument_extract "--limit" "$@") && (argument_display "--limit" true "$@")

log_script_event "Version..."
FILE="VERSION"
VERSION=$(version_get "${FILE}")
echo "Version... $(yellow "${VERSION}")"
TAG="v${VERSION}"
echo "Tag... $(green "${TAG}")"

FORMAT="table(name,window_start_time,type,backup_kind,error,status,description)"

log_script_event "Before..."
gcloud sql backups list --project="${PROJECT}" --format="${FORMAT}"

log_script_event "Deleting..."

TIME_NOW=$(date +%s)
echo "Time... $(yellow "${TIME_NOW}")"

gcloud sql backups list --project=${PROJECT} --filter="type=ON_DEMAND" --format="json(name,type,backupInterval.startTime)" | jq -r '.[] | "\(.name) \(.backupInterval.startTime)"' | while read NAME TIMESTAMP; do
	echo "Name... $(yellow "${NAME}")"
	echo "Timestamp... $(yellow "${TIMESTAMP}")"
	TIMESTAMP_SEC=$(date -d "${TIMESTAMP}" +%s)

	AGE_SEC=$(( TIME_NOW - TIMESTAMP_SEC ))
	AGE_DAY=$(echo "scale=2; $AGE_SEC / 86400" | bc)
	echo "Age... $(yellow "${AGE_DAY}") days"

	if (( $(echo "${AGE_DAY} > ${LIMIT}" | bc -l) )); then
		echo "Delete... $(red "${NAME}")"
		gcloud sql backups delete "${NAME}" --project="${PROJECT}" --quiet
	else
		echo "Skip!"
	fi
done

# TODO: reidenzon - Skip if no new migrations, but will require external DB connection string.
log_script_event "Backup..."
DESCRIPTION="Before [${TAG}] migrations (if any)."
gcloud sql backups create --instance="${INSTANCE}" --project="${PROJECT}" --description="${DESCRIPTION}"

log_script_event "After..."
gcloud sql backups list --project="${PROJECT}" --format="${FORMAT}"

log_script_end "$0"
