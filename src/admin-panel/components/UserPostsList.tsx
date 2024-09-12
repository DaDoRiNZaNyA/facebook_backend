import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableRow,
  TableCell,
  TableCaption,
  TableHead,
  TableBody,
  Pagination,
  Text,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
} from '@adminjs/design-system';

const UserPostsList: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [postsPage, setPostsPage] = useState<number>(1);
  console.log(props.record.params.id);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/admin/api/resources/Post/actions/list/?page=${postsPage}&filters.user=${props.record.params.id}`,
        );
        setPosts(response.data.records);
        setTotal(response.data.meta.total);
      } catch (error) {
        setError('Error fetching posts.');
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [props.record.params.id, postsPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ paddingTop: 20 }}>
      <Table>
        <TableCaption>Список постов</TableCaption>
        <TableHead>
          <TableRow>
            <TableCell>Post ID</TableCell>
            <TableCell>Text</TableCell>
            <TableCell>Media</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map((post) => (
            <TableRow
              key={post.id}
              style={{ cursor: 'pointer' }}
              onClick={() =>
                navigate(`/admin/resources/Post/records/${post.id}/show`)
              }
            >
              <TableCell>{post.params.id}</TableCell>
              <TableCell>{post.params.text}</TableCell>
              <TableCell>{post.params.media}</TableCell>
              <TableCell>
                {new Date(post.params.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Text py="xl" textAlign="center">
        <Pagination
          page={postsPage}
          onChange={(value) => setPostsPage(value)}
          total={total}
          perPage={10}
        />
      </Text>
    </div>
  );
};

export default UserPostsList;
