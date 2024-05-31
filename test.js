import * as chai from 'chai';
import app from './index.js';
import supertest from 'supertest';
import chaiHttp from 'chai-http'

chai.use(chaiHttp);

const request = supertest.agent(app);

describe('API Tests', () => {
  // Test para la ruta POST /agregar-producto
  it('Debería agregar un nuevo producto', (done) => {
    const newProduct = {
      nombre: 'Nuevo Producto',
      precio: 19.99,
      descripcion: 'Descripción del nuevo producto'
    };

    request
      .post('/agregar-producto')
      .send(newProduct)
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.text).to.equal('Producto agregado exitosamente');
        done();
      });
  });

  // Test para la ruta GET /productos
  it('Debería obtener todos los productos', (done) => {
    request
      .get('/productos')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.be.an('array');
        done();
      });
  });

  // Puedes agregar más pruebas según las rutas y funcionalidades de tu API
});
