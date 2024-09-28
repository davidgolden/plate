import React from 'react';

import { withRef, withVariants } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common/react';
import { cva } from 'class-variance-authority';

const headingVariants = cva('relative mb-1', {
  variants: {
    variant: {
      h1: 'mt-[1.6em] pb-1 font-heading text-4xl font-bold',
      h2: 'mt-[1.4em] pb-px font-heading text-2xl font-semibold tracking-tight',
      h3: 'mt-[1em] pb-px font-heading text-xl font-semibold tracking-tight',
      h4: 'mt-[0.75em] font-heading text-lg font-semibold tracking-tight',
      h5: 'mt-[0.75em] text-lg font-semibold tracking-tight',
      h6: 'mt-[0.75em] text-base font-semibold tracking-tight',
    },
  },
});

const blockVariants = cva('', {
  variants: {
    isFirstBlock: {
      false: '',
      true: 'mt-0',
    },
  },
});

const HeadingElementVariants = withVariants(
  withVariants(PlateElement, headingVariants, ['variant']),
  blockVariants,
  ['isFirstBlock']
);

export const HeadingElement = withRef<typeof HeadingElementVariants>(
  ({ children, isFirstBlock, variant = 'h1', ...props }, ref) => {
    const { editor, element } = props;

    const Element = variant!;

    return (
      <HeadingElementVariants
        ref={ref}
        asChild
        variant={variant}
        isFirstBlock={element === editor.children[0]}
        {...props}
      >
        <Element>{children}</Element>
      </HeadingElementVariants>
    );
  }
);
