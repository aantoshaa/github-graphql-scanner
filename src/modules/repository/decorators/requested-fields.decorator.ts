import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FieldNode } from 'graphql';
import { countBy, forEach, groupBy, keys, reduce } from 'lodash';
import 'reflect-metadata';

export const GQLRequestedFields = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const info = GqlExecutionContext.create(ctx).getInfo();

    const requestedFields: string[] =
      info.fieldNodes[0].selectionSet.selections.map(
        (selection: FieldNode) => selection.name.value,
      );

    const result = reduce(
      requestedFields,
      (acc, field) => ({ [field]: true, ...acc }),
      {},
    );
    return result;
  },
);
