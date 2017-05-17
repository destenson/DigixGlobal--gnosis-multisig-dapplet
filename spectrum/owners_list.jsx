import React, { PropTypes, Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';

import OwnersActionIcon from './owners_action_icon.jsx';

const DefaultAddressSelector = require('@digix/spectrum/src/components/common/default_address_selector').default;
const AddressInput = require('@digix/spectrum/src/components/common/address_input').default;

export default class OwnersList extends Component {
  render() {
    const owners = this.props.contract.getOwners() || [];
    return (
      <Segment.Group>
        {owners.map(owner => (
          <Segment>
            <code>{owner}</code>{' '}{' '}{' '}
            <OwnersActionIcon
              {...this.props}
              header={`Replace Owner: ${owner}`}
              icon={{ color: 'blue', name: 'edit' }}
              getMethodData={({ newAddress }) => this.props.contract.replaceOwner.getData(owner, newAddress)}
              renderForm={({ formChange, formData }) => (
                <Form.Field>
                  <Form.Field>
                    <label>From</label>
                    <DefaultAddressSelector />
                  </Form.Field>
                  <AddressInput placeholder="e.g. `0x123...456`" label="New Address" name="newAddress" {...{ formChange, formData }} />
                </Form.Field>
              )}
            />
            <OwnersActionIcon
              {...this.props}
              header={`Remove Owner: ${owner}`}
              icon={{ color: 'red', name: 'remove' }}
              getMethodData={() => this.props.contract.removeOwner.getData(owner)}
              renderForm={() => (
                <Form.Field>
                  <Form.Field>
                    <label>From</label>
                    <DefaultAddressSelector />
                  </Form.Field>
                </Form.Field>
              )}
            />
          </Segment>
        ))}
      </Segment.Group>
    );
  }
}

OwnersList.propTypes = {
  contract: PropTypes.object.isRequired,
};