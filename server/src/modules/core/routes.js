import services from './services.js';

export default (app, path, model, permissions) => {
  const instanceServices = services(path, model, permissions);

  return {
    setup: (methods) => {
      if (methods.get === true) {
        app.get(path, instanceServices.get);
      }
      if (methods.post === true) {
        app.post(path, instanceServices.post);
      }
      if (methods.put === true) {
        app.put(path, instanceServices.put);
      }
      if (methods.delete === true) {
        app.delete(path, instanceServices.delete);
      }
    }
  };
};
