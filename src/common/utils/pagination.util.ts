import { PaginationParams } from '../decorators/pagination.decorator';

export type PrismaModel<T> = {
  findUnique: (args: any) => Promise<T>;
  findMany: (args: any) => Promise<T[]>;
};

export type FindAllPaginateInputType<T> = {
  pagination: PaginationParams;
  model: PrismaModel<T> | null;
  query: object;
  afterType: string;
};

export type FindAllPaginateOutputType<T> = {
  items: T[];
  pagination: {
    take: number;
    after: string | null;
    hasNextPage: boolean;
  };
};

export async function findAllPaginate<T>(
  obj: FindAllPaginateInputType<T>,
): Promise<FindAllPaginateOutputType<T>> {
  const { pagination, model = null, query, afterType } = obj || {};

  const { after, take } = pagination || {};

  const paginationQuery: Record<string, any> = {};

  if (after && model) {
    const exists: T = await model.findUnique({
      where: { id: after },
      select: { [afterType]: true },
    });
    if (exists) {
      paginationQuery.cursor = { [afterType]: after };
      paginationQuery.skip = 1;
    }
  }

  let items: T[] = [];
  let hasNextPage = false;
  let afterResponse: string | null = null;

  if (model) {
    const results: T[] = await model.findMany({
      ...paginationQuery,
      ...query,
      take: take + 1,
    });

    hasNextPage = results.length > take;
    items = results;
    if (hasNextPage) {
      items = results.slice(0, take);
      afterResponse = (items[items.length - 1][afterType] as string) || null;
    }
  }

  return {
    items: items,
    pagination: {
      take: take,
      after: afterResponse,
      hasNextPage: hasNextPage,
    },
  };
}
