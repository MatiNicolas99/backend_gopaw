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


jest.mock('./appcontroller.js');

    describe('appGetVeterinarys', () => {
          test('should return an array of veterinarys', async () => {
            const mockVeterinarys = [
              { id: 1, veterinary_name: 'Veterinary 1', phone: '123-456-7890', email: 'veterinary1@example.com', image: 'image1.jpg' },
              { id: 2, veterinary_name: 'Veterinary 2', phone: '234-567-8901', email: 'veterinary2@example.com', image: 'image2.jpg' },
            ];
            appGetVeterinarys.mockResolvedValue(mockVeterinarys);
            const req = {};
            const res = { json: jest.fn() };
            await appGetVeterinarys(req, res);
            expect(res.json).toHaveBeenCalledWith(mockVeterinarys);
          });
        
          test('should return an error response if getVeterinarys throws an error', async () => {
            const mockError = new Error('Something went wrong');
            appGetVeterinarys.mockRejectedValue(mockError);
            const req = {};
            const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
            await appGetVeterinarys(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith(mockError);
          });
        });

     describe('appGetReviews', () => {
            test('should return an array of reviews', async () => {
              const mockReviews = [{ id: 1, rating: 4 }, { id: 2, rating: 5 }];
              jest.spyOn(global, 'fetch').mockResolvedValue({
                json: jest.fn().mockResolvedValue(mockReviews),
              });
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

     
jest.mock('jsonwebtoken', () => ({
            verify: jest.fn(),
          }));
          jest.mock('../config/appconfig.js', () => ({
            delAppointmentById: jest.fn(),
            delReviewById: jest.fn(),
            editReview: jest.fn(),
          }));
          
          describe('appDelAppointmentById', () => {
            test('should delete an appointment and return success message', async () => {
              const req = {
                body: { id: '123' },
                header: () => 'Bearer fake-token',
              };
              const res = {
                send: jest.fn(),
                status: jest.fn(),
              };
              const mockDelAppointmentById = require('../config/appconfig.js').delAppointmentById;
              mockDelAppointmentById.mockResolvedValueOnce();
          
              await appDelAppointmentById(req, res);
          
              expect(mockDelAppointmentById).toHaveBeenCalledWith('123');
              expect(res.send).toHaveBeenCalledWith('Appointment successfully deleted');
            });
          
            test('should handle errors', async () => {
              const req = { body: {} };
              const res = {
                send: jest.fn(),
                status: jest.fn(),
              };
              const mockDelAppointmentById = require('../config/appconfig.js').delAppointmentById;
              mockDelAppointmentById.mockRejectedValueOnce({ code: 404 });
          
              await appDelAppointmentById(req, res);
          
              expect(mockDelAppointmentById).toHaveBeenCalledWith(undefined);
              expect(res.status).toHaveBeenCalledWith(404);
              expect(res.send).toHaveBeenCalledWith({ code: 404 });
            });
          });
          
          describe('appDelReviewById', () => {
            test('should delete a review and return success message', async () => {
              const req = {
                body: { id: '456' },
                header: () => 'Bearer fake-token',
              };
              const res = {
                send: jest.fn(),
                status: jest.fn(),
              };
              const mockDelReviewById = require('../config/appconfig.js').delReviewById;
              mockDelReviewById.mockResolvedValueOnce();
          
              await appDelReviewById(req, res);
          
              expect(mockDelReviewById).toHaveBeenCalledWith('456');
              expect(res.send).toHaveBeenCalledWith('Review successfully deleted');
            });
          
            test('should handle errors', async () => {
              const req = { body: {} };
              const res = {
                send: jest.fn(),
                status: jest.fn(),
              };
              const mockDelReviewById = require('../config/appconfig.js').delReviewById;
              mockDelReviewById.mockRejectedValueOnce({ code: 500 });
          
              await appDelReviewById(req, res);
          
              expect(mockDelReviewById).toHaveBeenCalledWith(undefined);
              expect(res.status).toHaveBeenCalledWith(500);
              expect(res.send).toHaveBeenCalledWith({ code: 500 });
            });
          });
          
         