# Next Trip

You can find the app on the web [here](https://next-trip.vercel.app/). Be sure to checkout both mobile and desktop layouts. The app is fully fluid.

## Start here

Before performing any of the following steps, insall the production and development dependencies:

```bash
npm i
```

## Running the app locally

For this section, ensure that your machine has port `3000` open.

To spin up the development server:

```bash
npm run dev
```

Then follow the link in the terminal or manually direct your browser to [http://localhost:3000](http://localhost:3000)

To build the project and spin up something closer to production:

```bash
npm run build && npm run start
```

Then follow the link in the terminal or manually direct your browser to [http://localhost:3000](http://localhost:3000)

## Testing

To run the unit and integration tests:

```bash
npm run test
```

To run the e2e tests, first ensure the app is running locally per one of the methods described above, then:

```bash
npm run cypress:open
```

# Assumptions

- App should be designed mobile-first.

- A clean, simple UX easy to use and understand while on the move and/or in a hurry. It should be relatively hard to press the wrong button while walking or even running and if the user _does_ press the wrong button the UX needs to make it easy for the user to see that.

- Bright primary colors derived from the Metro Transit logo connote some measure of stolid municiplaity, but desaturating the colors and picking a more fashionable font give the app a more modern feel than most apps for city services.

- Animated page transitions help users understand where they are in the app.

- App needs extremely high performance metrics, many users will be accessing the app on old mobile devices. This means careful attention to best practices and a low dependency footprint.

- Rendering based on URL params ensures users can send links to one another and see the same content.

- This app is open to extension. The stack I've selected (NextJS, Typescript, Sass, Jest and Cypress), provide self-documenting code making it easier for another developer to contribute should such an opportunity arise.
