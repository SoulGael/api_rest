import services from './services.js';

export default (app, path, model) => {
  const instanceServices = services(path, model);

  return {
    setup: (methods) => {
      if (methods.get === true) {
        app.get(path, instanceServices.get);
      }
    }
  };
};
