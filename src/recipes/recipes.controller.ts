import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @HttpCode(200)
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.recipesService.find(Number(id));
  }

  @Patch(':id')
  update(@Body() updateRecipeDto: UpdateRecipeDto, @Param('id') id: string) {
    if (id == null) id = '1';
    return this.recipesService.update(Number(id), updateRecipeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    if (id == null) id = '1';
    return this.recipesService.delete(Number(id));
  }
}
