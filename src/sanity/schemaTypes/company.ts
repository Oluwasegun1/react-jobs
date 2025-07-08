export default {
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    {name: 'name', title: 'Company Name', type: 'string'},
    {name: 'description', title: 'Description', type: 'text'},
    {name: 'contactEmail', title: 'Contact Email', type: 'string'},
    {name: 'contactPhone', title: 'Contact Phone', type: 'string'},
  ],
}
