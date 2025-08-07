import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema.js';
import { useEffect, useRef } from 'react';
import cnm from 'classnames';
import cn from './EditName.module.scss';

export const EditName = ({
  name,
  itemId,
  updateName,
  styles,
  isEditing,
  setIsEditing,
  openMenuId,
}) => {
  const mousePos = useRef({ x: 0, y: 0 });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name },
  });

  const { register, reset, handleSubmit, setValue } = form;

  useEffect(() => {
    reset({ name });
  }, [name, itemId]);

  const editName = handleSubmit((formValues) => {
    if (formValues.name) {
      updateName(formValues);
    } else {
      setValue('name', name);
    }
    setIsEditing(false);
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleKeyDown = (e) => {
      if (!e.ctrlKey || e.code !== 'KeyQ') return;
      if (openMenuId) return;

      const { x, y } = mousePos.current;
      const hovered = document.elementFromPoint(x, y);
      const wrapper = hovered?.closest('[data-edit-id]');
      const hoveredId = wrapper?.getAttribute('data-edit-id');

      if (hoveredId === itemId) {
        setIsEditing(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [itemId, openMenuId]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      editName();
    }
  };

  return isEditing ? (
    <div className={cnm(cn.inputWrapper, styles)}>
      <input
        {...register('name')}
        className={cnm(cn.input)}
        autoFocus
        maxLength={100}
        onBlur={editName}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onKeyDown={onKeyDown}
      />
    </div>
  ) : (
    <div className={cnm(cn.editName, styles)}>
      <h2 className={cn.title}>{name}</h2>
    </div>
  );
};
