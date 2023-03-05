const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const pool = require("../config/appconfig");
const {getVeterinarys,
    getReviews,
    getOwnerById,
    getVeterinaryById,
    getPetAppointments,
    getVeterinaryAppointments,
    getIdUsuarioPorEmail,  
    verificarCredenciales,   
    registrarVet,
    registrarUsuario,
    registrarReviewConToken,
    registrarPetConToken,
    registrarAppointment, 
    delAppointmentById,
    delReviewById,   
    editReview,
    editOwner,
    editVeterinary,
    editOwnerPassword,
    editVeterinaryPasswords} = require('../models/appmodel')

const {
        appGetVeterinarys,
        appGetReviews,
        appGetOwnerById,
        appGetVeterinaryById,
        appGetPetAppointments,
        appGetVeterinaryAppointments,
        appLogin,       
        nuevoUsuario,
        nuevoVet,
        nuevaReseña,
        nuevaMascota,
        nuevoAppointment,        
        appDelAppointmentById,
        appDelReviewById,        
        appPutReview,
        appPutOwner,
        appPutVeterinary,
        appPutOwnerPassword,
        appPutVeterinaryPassword} = require('./appcontroller')

const waitForPort = require('wait-for-port');

describe('my server', () => {
  beforeAll(async () => {
    await new Promise((resolve) => {
       waitForPort('localhost', 8080, resolve);
        });
    });
        
  afterEach(() => {
    jest.resetAllMocks();  
  });
    
     
        
  
jest.mock('./appcontroller.js');

    describe('appGetVeterinarys', () => {
          test('should return an array of veterinarys', async () => {           
            const getVeterinarys = jest.fn();
            const mockVeterinarys = [
              {
                "id": 4,
                "veterinary_name": "pedro",
                "phone": "123412345",
                "email": "pedro@gmail.com",
                "image": null
              },             
              {
                "id": 6,
                "veterinary_name": "pedro",
                "phone": "123412345",
                "email": "pedro@gmail.com",
                "image": null
              },
              {
                "id": 2,
                "veterinary_name": "sanchoPanza",
                "phone": "99988877744",
                "email": "sancho@panza.com",
                "image": null
              },              
            ];
           getVeterinarys.mockResolvedValue(mockVeterinarys);
            const req = {};
            const res = { json: jest.fn() };
            await appGetVeterinarys(req, res);
            expect(res.json).toHaveBeenCalledWith(mockVeterinarys);
          });
        
          test('should return an error response if getVeterinarys throws an error', async () => {
            const getVeterinarys = jest.fn();            
            const mockError = ({message:'Something went wrong'});
           getVeterinarys.mockRejectedValue(mockError);
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            await appGetVeterinarys(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(mockError);
          });
        });

    describe('appGetReviews', () => {
          test('should return an array of reviews', async () => {
            const mockReviews = [
              {
                id: 3,
                date: '12/30/2023',
                title: 'review test',
                content: 'asdasdasdasdassdasdasdasdasdasdasdas',
                owner_id: 5,
                veterinary_id: 6,
              },
              {
                id: 1,
                date: '12/31/2023',
                title: 'edicion de review',
                content: 'se edita el review',
                owner_id: 1,
                veterinary_id: 2,
              },
            ];
        
            global.fetch = jest.fn(() =>
              Promise.resolve({
                json: () => Promise.resolve(mockReviews),
              })
            );
        
            const req = {};
            const res = {
              json: jest.fn(),
              status: jest.fn().mockReturnThis(),
              send: jest.fn(),
            };
        
            await appGetReviews(req, res);
        
            expect(res.json).toHaveBeenCalledWith(mockReviews);
          });
        });



// jest.mock('./appcontroller.js', () => ({
//             delAppointmentById: jest.fn(),
//             delReviewById: jest.fn(),
//             editReview: jest.fn(),
//           }));
          
//           describe('appDelAppointmentById', () => {
//             test('should delete an appointment and return success message', async () => {
//               const req = {
//                 params: { id: '123' },
//                 header: () => 'Bearer fake-token',
//               };
//               const res = {
//                 send: jest.fn(),
//                 status: jest.fn(),
//               };
//               const mockDelAppointmentById = require('./appcontroller').delAppointmentById;
//               mockDelAppointmentById.mockResolvedValueOnce();
            
//               await appDelAppointmentById(req, res);
            
//               expect(mockDelAppointmentById).toHaveBeenCalledWith('123');
//               expect(res.send).toHaveBeenCalledWith('Appointment eliminado con éxito');
//             });
          
  //         describe('appDelReviewById', () => {
  //           test('should delete a review and return success message', async () => {
  //             const req = {
  //               body: { id: '456' },
  //               header: () => 'Bearer fake-token',
  //             };
  //             const res = {
  //               send: jest.fn(),
  //               status: jest.fn(),
  //             };
  //             const mockDelReviewById = require('../config/appconfig.js').delReviewById;
  //             mockDelReviewById.mockResolvedValueOnce();
          
  //             await appDelReviewById(req, res);              
          
  //             expect(mockDelReviewById).toHaveBeenCalledWith('456');
  //             expect(res.send).toHaveBeenCalledWith('Review eliminado con éxito');
  //           });
          
  //           test('should handle errors', async () => {
  //             const req = { body: {} };
  //             const res = {
  //               send: jest.fn(),
  //               status: jest.fn(),
  //             };
  //             const mockDelReviewById = require('../config/appconfig.js').delReviewById;
  //             mockDelReviewById.mockRejectedValueOnce({ code: 500 });
          
  //             await appDelReviewById(req, res);
          
  //             expect(mockDelReviewById).toHaveBeenCalledWith(undefined);
  //             expect(res.status).toHaveBeenCalledWith(500);
  //             expect(res.send).toHaveBeenCalledWith({ code: 500 });
  //           });
          // });
   })       