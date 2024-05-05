import { FC } from 'react'
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export const BackButton: FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1)
      }}
    >
      &larr; Back
    </Button>
  )
}
