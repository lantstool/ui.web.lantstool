import { Children, isValidElement, cloneElement } from 'react';

export const addPropsToChildren = (children = [], props = {}) =>
  Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, {
          ...(typeof child.type === 'string' ? {} : props), // Add props only to components and skip plain html
          children: child.props.children
            ? addPropsToChildren(child.props.children, props)
            : child.props.children,
        })
      : child,
  );
