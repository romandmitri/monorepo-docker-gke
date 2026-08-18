output "folder" {
  value = data.terraform_remote_state.folder.outputs
}

output "common" {
  value = data.terraform_remote_state.common.outputs
}

output "local" {
  value = data.terraform_remote_state.local.outputs
}

output "runner" {
  value = data.terraform_remote_state.runner.outputs
}

output "cluster-dev" {
  value = data.terraform_remote_state.cluster-dev.outputs
}

output "cluster-stage" {
  value = data.terraform_remote_state.cluster-stage.outputs
}

output "cluster-prod" {
  value = data.terraform_remote_state.cluster-prod.outputs
}
