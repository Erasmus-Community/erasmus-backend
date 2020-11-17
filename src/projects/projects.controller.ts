import { Controller, Delete, Get, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService) {}
  
    @UseGuards(JwtAuthGuard)
    @Get('')
    async getProjects(): Promise<string> {
        return this.projectService.getProjects();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getProjectInfo(@Param('id', ParseIntPipe) id: number): Promise<string> {
      return this.projectService.getProjectInfo();
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateProject(@Param('id', ParseIntPipe) id:number): Promise<string>{
      return this.projectService.updateProject();
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteProject(@Param('id', ParseIntPipe) id: number): Promise<string>{
      return this.projectService.deleteProject();
    }
  }
}
