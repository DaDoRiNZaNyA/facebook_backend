import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPostsList: React.FC<any> = (props) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [Table, setTable] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/admin/api/resources/Post/actions/list/?page=1&filter.user=${props.record.params.id}/records`,
        );
        setPosts(response.data.records);
      } catch (error) {
        setError('Error fetching posts.');
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [props.record.params.id]);

  useEffect(() => {
    const loadTable = async () => {
      try {
        const module = await import('@adminjs/design-system');
        setTable(() => module.Table);
      } catch (error) {
        console.error('Error loading Table component:', error);
        setError('Error loading Table component.');
      }
    };

    loadTable();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!Table) return <p>Loading Table component...</p>;

  return (
    <div>
      <Table
        columns={[
          { Header: 'Post ID', accessor: 'id' },
          { Header: 'Text', accessor: 'text' },
          { Header: 'Media', accessor: 'media' },
          { Header: 'Created At', accessor: 'createdAt' },
        ]}
        data={posts.map((post) => ({
          id: post.params.id,
          text: post.params.text,
          media: post.params.media,
          createdAt: new Date(post.params.createdAt).toLocaleString(),
        }))}
      />
    </div>
  );
};

export default UserPostsList;
