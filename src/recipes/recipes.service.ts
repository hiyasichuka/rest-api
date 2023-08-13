import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto) {
    try {
      const { title, making_time, serves, ingredients, cost } = createRecipeDto;
      const recipe = await this.prisma.recipe.create({
        data: {
          title,
          making_time,
          serves,
          ingredients,
          cost,
        },
      });

      const response = {
        message: 'Recipe successfully created!',
        recipe: recipe,
      };
      return response;
    } catch {
      const response = {
        message: 'Recipe creation failed!',
        required: 'title, making_time, serves, ingredients, cost',
      };
      return response;
    }
  }

  async findAll() {
    const recipe = await this.prisma.recipe.findMany();
    const response = {
      recipe,
    };
    return response;
  }

  async find(id: number) {
    const recipe = await this.prisma.recipe.findFirst({
      where: {
        id: id,
      },
    });

    const response = {
      message: 'Recipe details by id',
      recipe,
    };

    return response;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const { title, making_time, serves, ingredients, cost } = updateRecipeDto;

    await this.prisma.recipe.update({
      where: { id: id },
      data: {
        title,
        making_time,
        serves,
        ingredients,
        cost,
      },
    });
  }

  async delete(id: number) {
    try {
      await this.prisma.recipe.delete({
        where: { id: id },
      });
      return { message: 'Recipe successfully removed!' };
    } catch {
      return { message: 'No Recipe found' };
    }
  }
}
