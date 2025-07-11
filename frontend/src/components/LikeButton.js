import React from "react";

const LikeButton = () => {
  const [like, setLike] = React.useState(0);
  const handleLikeButton = () => {
    setLike(like + 1);
    setLike(like + 1);
    setLike(like + 1);
    setLike(like + 1);
  };
  const handleDislikeButton = () => {
    setLike(like - 1);
  };

  return (
    <div>
      <button
        onClick={handleLikeButton}
        style={{
          backgroundColor: true ? "#ff4081" : "#ccc",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Likes : {like}
      </button>
      <button
        onClick={handleDislikeButton}
        style={{
          backgroundColor: true ? "#ff4081" : "#ccc",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Dislikes : {like}
      </button>
    </div>
  );
};

export default LikeButton;
