export default {
  name: 'job',
  title: 'Job',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'type', title: 'Job Type', type: 'string'},
    {name: 'location', title: 'Location', type: 'string'},
    {name: 'description', title: 'Description', type: 'text'},
    {name: 'salary', title: 'Salary', type: 'string'},
    {
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{type: 'company'}],
    },
  ],
}
// export const schemaTypes = [
//   {
//     name: 'job',
//     title: 'Job',
//     type: 'document',
//     fields: [
//       {name: 'title', title: 'Title', type: 'string'},
//       {name: 'type', title: 'Job Type', type: 'string'},
//       {name: 'location', title: 'Location', type: 'string'},
//       {name: 'description', title: 'Description', type: 'text'},
//       {name: 'salary', title: 'Salary', type: 'string'},
//       {
//         name: 'company',
//         title: 'Company',
//         type: 'reference',
//         to: [{type: 'company'}],
//       },
//     ],
//   },
// ]
