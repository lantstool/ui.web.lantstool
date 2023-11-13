import { Routes, Route } from 'react-router-dom';

export const Spaces = () => {
  return (
    <div>
      Spaces
      <Routes>
        <Route index element={<p>Root</p>} />
        <Route path="/1" element={<p>1</p>} />
        <Route path="/2" element={<p>2</p>} />
      </Routes>
    </div>
  );
};
