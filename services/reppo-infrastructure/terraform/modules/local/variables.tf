variable "billing_account_id" {
  description = "Billing account to use for this project."
  type        = string
}

variable "folder_id" {
  description = "Root folder that houses all projects."
  type        = string
}

variable "member_admin" {
  description = "Admin members, highest access."
  type        = string
}

variable "member_admin_roles" {
  description = "Roles granted to admin members, in addition to developer roles."
  type        = list(string)
}

variable "member_developer" {
  description = "Developers group, medium access."
  type        = string
}

variable "member_developer_roles" {
  description = "Roles granted to developer members."
  type        = list(string)
}

variable "project_name" {
  description = "Name of project."
  type        = string
}

variable "region" {
  description = "Project region."
  type        = string
}
