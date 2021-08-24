const Data = {
  targets: [
    { id: 'a', text: 'teamA', value: '@aa @ab' },
    { id: 'b', text: 'teamB', value: '@ba @bb' },
    { id: 'c', text: 'teamC', value: '@ca @cc' },
  ],
  templates: [
    {
      title: '作業通知1',
      text: `
{{targets}}
# 作業通知
{{content}}
日時：{{date}} {{time}}
{{username}}`,
      targets: ['a', 'b'],
    },
    {
      title: '作業通知2',
      text: `なし`,
      targets: ['a', 'c'],
    },
  ],
};
export default Data;
