import { expect } from 'chai';
import RuleView from '@/views/RuleView';
import { shallowMountComponent, mockAxios } from '../setup';

let ruleYaml = `__praeco_query_builder: '{"query":{"logicalOperator":"all","children":[]}}'
alert:
  - slack
alert_subject: test subject
alert_subject_args: []
alert_text: test body
alert_text_args: []
alert_text_type: alert_text_only
doc_type: syslog
filter:
  - query:
      query_string:
        query: '@timestamp:*'
import: BaseRule.config
index: hannibal-*
is_enabled: false
name: test123
num_events: 10000
realert:
  minutes: 5
slack_channel_override: '#elastalert-debugging'
slack_msg_color: danger
slack_title_link: 'http://localhost:8080/rules/test123'
slack_username_override: Praeco
timeframe:
  minutes: 5
timestamp_field: '@timestamp'
timestamp_type: iso
type: frequency
use_count_query: true
use_strftime_index: false
`;

mockAxios.onGet('/api/metadata/elastalert').reply(200, {});
mockAxios.onGet('/api/metadata/silence').reply(200, {});
mockAxios.onGet('/api/metadata/elastalert_status').reply(200, {});
mockAxios.onGet('/api/rules/test123').reply(200, { yaml: ruleYaml });

describe('RuleView', () => {
  let wrapper = shallowMountComponent(RuleView, {
    propsData: {
      id: 'test123'
    }
  });

  it('renders the rule', () => {
    let app = wrapper.find('h1');
    return expect(app.text()).to.equal('test123\n        Disabled');
  });
});
