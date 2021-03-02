# Next Trip

You can find the app on the web [here](https://next-trip.vercel.app/).

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

To run the e2e tests, first ensure the app is running locally, then:

```bash
npm run cypress:open
```

# Assumptions

My most consequential assumption was that I should approach this project with a mobile-first mindset.
