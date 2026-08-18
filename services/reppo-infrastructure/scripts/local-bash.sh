#!/bin/bash

# https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -o errexit
set -o errtrace

source "$(dirname "${BASH_SOURCE[0]}")/local-utility.sh"

log_script_start "$0"

echo ""
echo "== $(red_light "reppo-infrastructure")========="
echo ""
echo "If you get permission error, you need to login from the host."
green "make local-login"
echo ""
echo ""
echo "== $(magenta "Terraform") ===================="
echo ""
echo "To update $(magenta "terraform") state..."
echo ""
magenta "cd terraform/state/STATE && terraform apply"
echo ""
tree -d terraform/states
echo ""
echo ""
echo "== $(blue_light "Kubernetes") ================"
echo ""
echo "To access clusters..."
blue_light "kubectl --context=CONTEXT get all"
kubectl config get-contexts --output=name

log_script_end "$0"

# https://unix.stackexchange.com/questions/466999/what-does-exec-do
#exec "$@"
