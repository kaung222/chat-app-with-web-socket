import { Controller, Get } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseSevice: CourseService) {}
  @Get()
  getAllCourses() {
    return this.courseSevice.getAllCourses();
  }
}
