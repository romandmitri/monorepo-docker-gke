module "reppo-folder" {
  source = "../../modules/folder"

  folder_id       = "215819116620"
  service_account = "serviceAccount:terraform@reppo-terraform.iam.gserviceaccount.com"
}
