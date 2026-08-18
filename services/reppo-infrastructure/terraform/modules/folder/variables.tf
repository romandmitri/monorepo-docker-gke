
variable "folder_id" {
  description = "Root folder that houses all projects."
  type        = string
}

variable "service_account" {
  description = "Terraform service account to grant on folder."
  type        = string
}
