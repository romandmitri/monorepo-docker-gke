#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/../../scripts/common/utility.sh"

log_script_start "$0"

JOB_NAME=$(argument_extract "--job" "$@") && (argument_display "--job" true "$@")

log_script_event "Jobs..."
kubectl get all --selector=job-name="${JOB_NAME}"


# https://kubernetes.io/docs/concepts/workloads/controllers/job/#job-termination-and-cleanup
log_script_event "Status..."

# https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-phase
POD_PHASE_FAILED="Failed"
POD_PHASE_PENDING="Pending"
POD_PHASE_RUNNING="Running"
POD_PHASE_SUCCEEDED="Succeeded"

TIME_INTERVAL_SECONDS=5

function get_phase() {
	# TODO: reidenzon - When pods are missing image they stick to Pending phase and take long time to Fail.
	kubectl get pods --selector=job-name="${JOB_NAME}" --output=jsonpath='{.items[*].status.phase}'
}

while true; do

	echo "Checking..."
	JOB_PHASE=$(get_phase)
	echo "Phase: $(yellow "${JOB_PHASE}")"

	# TODO: reidenzon - The LOGS from pods/* (instead of jobs/*) might have more data.

	case $JOB_PHASE in
	"${POD_PHASE_RUNNING}")
		yellow "Running!"
		echo "Tailing..."
		kubectl logs -f --selector "job-name=${JOB_NAME}" --tail=-1
		break
		;;

	"${POD_PHASE_FAILED}")
		red "Failed!"
		kubectl describe job --selector "job-name=${JOB_NAME}"
		kubectl logs --selector "job-name=${JOB_NAME}" --tail=-1
		# TODO: reidenzon - Move this lower?!
		exit 1
		break
		;;

	"${POD_PHASE_PENDING}")
		yellow "Pending"
		;;

	"${POD_PHASE_SUCCEEDED}")
		green "Success!"
		kubectl logs --selector "job-name=${JOB_NAME}" --tail=-1
		break
		;;

	*)
		echo "Unknown..."
		;;
	esac

	echo "Sleeping $(yellow "${TIME_INTERVAL_SECONDS}") seconds..."
	sleep "${TIME_INTERVAL_SECONDS}"

done

log_script_event "Deleting..."
kubectl delete job --selector=job-name="${JOB_NAME}"

log_script_end "$0"
