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
      class="sc-ftvSup kVUcwg"
    >
      <div
        class="sc-papXJ EdTBl"
      >
        <img
          alt="homepage image"
          class="sc-jqUVSM dRYAeq"
          src="home-bg.jpg"
        />
      </div>
      <div
        class="sc-kDDrLX dHQHje"
      >
        <p
          class="sc-iqcoie hXlBHM"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores distinctio debitis amet neque quasi qui repellat reprehenderit ducimus pariatur laborum. Exercitationem quaerat optio nulla. Consectetur sed in sunt quisquam sint dolores voluptatem voluptate amet repudiandae a velit id officiis delectus expedita placeat deserunt architecto, ratione est tempore non saepe.
        </p>
        <p
          class="sc-iqcoie hXlBHM"
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
