import { Test, TestingModule } from '@nestjs/testing';
import { CreatorCreateArticleInputDto } from '../dto/creator-create-article-input.dto';
import { CreatorArticleUseCase } from '../usecase/creator-article.usecase';
import { ArticleController } from './article.controller';

describe('ArticleController', () => {
  let controller: ArticleController;
  let useCaseCreateArticleMock: jest.Mock;

  beforeEach(async () => {
    useCaseCreateArticleMock = jest.fn().mockResolvedValue({});
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: CreatorArticleUseCase,
          useValue: {
            createArticle: useCaseCreateArticleMock,
          },
        },
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('should call once createArticle of article usecase, and return article', async () => {
    // Arrange
    const newArticle: CreatorCreateArticleInputDto =
      new CreatorCreateArticleInputDto();
    newArticle.title = 'title';
    newArticle.content = 'content ya';
    useCaseCreateArticleMock.mockResolvedValue({
      title: newArticle.title,
      content: newArticle.content,
    });

    // Act
    const result: any = await controller.create(newArticle);

    // Assert
    expect({
      title: result.title,
      content: result.content,
    }).toEqual({
      title: newArticle.title,
      content: newArticle.content,
    });
  });
});
