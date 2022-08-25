import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CONNECTION } from '../../../../constants/tenancy';
import { CreatorCreateArticleInputDto } from '../dto/creator-create-article-input.dto';
import { Article } from '../entity/article.entity';
import { CreatorArticleUseCase } from './creator-article.usecase';

describe('CreatorArticleUseCase Test', () => {
  let mockArticle: Article;
  let repositorySaveMock: jest.Mock;
  let adminArticleUseCase: CreatorArticleUseCase;

  beforeEach(async () => {
    mockArticle = new Article();
    mockArticle.title = 'abcdefg';

    repositorySaveMock = jest.fn().mockResolvedValue(mockArticle);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatorArticleUseCase,
        {
          provide: CONNECTION,
          useValue: {
            getRepository: jest.fn().mockReturnValue({
              save: repositorySaveMock,
            }),
          },
        },
      ],
    }).compile();

    adminArticleUseCase = module.get<CreatorArticleUseCase>(
      CreatorArticleUseCase,
    );
  });

  afterEach(() => {
    repositorySaveMock.mockRestore();
  });

  it('should successfully create a new article from creator', async () => {
    // Arrange
    const article: Article = new Article();
    article.title = 'mark said hello';
    article.content = 'hello';

    repositorySaveMock.mockResolvedValue(article);

    // Act
    const result: Article = await adminArticleUseCase.createArticle({
      title: article.title,
      content: article.content,
    } as CreatorCreateArticleInputDto);

    // Assert
    expect({
      title: result.title,
      content: result.content,
    }).toEqual({
      title: article.title,
      content: article.content,
    });
  });
});
