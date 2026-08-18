locals {
  project_id             = "cheese-${var.project_name}"
  storage_bucket_private = "cheese-${var.project_name}-private"
  storage_bucket_public  = "cheese-${var.project_name}-public"
}
