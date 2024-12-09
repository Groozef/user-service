import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { UsersService } from '../services/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('problems-count')
  async getProblemsCount() {
    return this.usersService.getProblemsCount();
  }

  @Post('update-problems')
  async updateProblems() {
    return this.usersService.updateProblems();
  }

  @Patch(':id/toggle-problem')
  async toggleProblem(@Param('id') id: number, @Body() body: { problems: boolean }) {
    return this.usersService.toggleProblem(id, body.problems);
  }
}
