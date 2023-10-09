import { Package } from 'revite'

export class ViewsPackage extends Package {
  providers = [
    import('/~/views/home/VueHomeViewProvider'),
    import('/~/views/terms/vue/TermsViewProvider'),
    import('/~/views/notes/VueNotesViewProvider'),
    import('/~/views/report/VueReportViewProvider'),
  ]
}
