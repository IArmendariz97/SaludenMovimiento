import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
import Post from "./Post";
import { addCommentToPost, fetchPosts } from "../../features/posts/postsSlice";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function PostList() {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCommentSubmit = (idPost, comment) => {
    dispatch(addCommentToPost({ idPost, comment }));
  };

  return (
    <div>
      <h2>Publicaciones</h2>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={(post) => (
          <List.Item
            key={post.idPost}
            actions={[
              <IconText
                key="comments"
                icon={MessageOutlined}
                text={post.Comments.length}
              />,
              <IconText key="star" icon={StarOutlined} text="156" />,
              <IconText key="like" icon={LikeOutlined} text="156" />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={post.Client.avatar} />}
              title={
                <h1>
                  {post.Client.User.name} {post.Client.User.lastname}
                </h1>
              }
              description={post.title}
            />
            <Post
              post={post}
              onCommentSubmit={(comment) =>
                handleCommentSubmit(post.idPost, comment)
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default PostList;
