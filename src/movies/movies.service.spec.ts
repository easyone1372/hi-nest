import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import exp from 'constants';
import { NotFoundException } from '@nestjs/common';

//.spec.ts: 각 파일의 유닛테스트를 위한 파일
describe('MoviesService', () => {
  let service: MoviesService;

  //beforeEach 외에 afterEach,afterAll,beforeAll 등 더 많은 hook존재
  //ex) afterAll은 데베를 깨끗하게 정리해주는 기능을 넣을 수 있다.

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      //expect(movie.id).toEqual(1);
    });
    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        //expect(e.message).toEqual(`Movie with ID 999 not found `);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
