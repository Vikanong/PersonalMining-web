import React from 'react';

interface ImageComponentProps {
  imageName: string;
}

function ImageComponent({ imageName }: ImageComponentProps) {
  return (
    <img src={require(`../assets/images/${imageName}.png`)} alt={imageName} className="icon" />
  );
}

export default ImageComponent