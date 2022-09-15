import React from 'react';
import { render } from '@testing-library/react';
import Home from '../Home';

describe('Home component', () => {
  it('renders image and paragraphs', () => {
    const { container } = render(<Home />);
    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="sc-bczRLJ fGSbSb"
  >
    <div
      class="sc-papXJ ekvpWp"
    >
      <div
        class="sc-jqUVSM fwbawk"
      >
        <img
          alt="homepage image"
          class="sc-kDDrLX evmRFV"
          src="home-bg.jpg"
        />
      </div>
      <div
        class="sc-iqcoie ecnLpb"
      >
        <p
          class="sc-crXcEl cMmMnn"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores distinctio debitis amet neque quasi qui repellat reprehenderit ducimus pariatur laborum. Exercitationem quaerat optio nulla. Consectetur sed in sunt quisquam sint dolores voluptatem voluptate amet repudiandae a velit id officiis delectus expedita placeat deserunt architecto, ratione est tempore non saepe.
        </p>
        <p
          class="sc-crXcEl cMmMnn"
        >
          Nulla, nam deleniti itaque ea omnis quidem facere nobis tempore!
        </p>
      </div>
    </div>
  </div>
</div>
`);
  });
});
