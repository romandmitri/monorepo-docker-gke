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

variable "notification_channels" {

  // Notification Channels must be manually configured.
  // https://console.cloud.google.com/monitoring/alerting/notifications

  // IDs can be found in the Policy details JSON/code file:
  // 1. Manually create Notification Channel on relevant project, if does not already exist.
  // 2. Click [Copy notification URL to clipboard] button (looks like chain link).

  type = list(string)
}

variable "project_name" {
  description = "Name of project."
  type        = string
}

variable "region" {
  description = "Project region."
  type        = string
}

variable "sql_availability" {
  description = "Can be REGION (high) or ZONAL (single)."
  type        = string
}

variable "sql_disk_size" {
  description = "Database disk size, in GB."
  type        = number
}

variable "sql_edition" {
  description = "Can be ENTERPRISE_PLUS or ENTERPRISE and will affect sql_tier options."
  type        = string
}

variable "sql_tier" {
  // https://cloud.google.com/sql/docs/mysql/admin-api/rest/v1beta4/tiers
  // https://cloud.google.com/compute/docs/instances/creating-instance-with-custom-machine-type#create

  description = "Database tier, see documentation for available values."
  type        = string
}

variable "sql_viewer" {
  description = "Google group/email who has IAM view access to database."
  type        = string
}
