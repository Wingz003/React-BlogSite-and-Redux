import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'
import { Link, useParams } from 'react-router-dom'
import { useGetPostsByUserIdQuery } from '../posts/postsSlice'

const UserPage = () => {
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))

    const {
        data: postsForUser,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsByUserIdQuery(userId);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        const { ids, entities } = postsForUser // Deconstructed Ids array. Entities: obj that has individual posts for the user.
        content = ids.map(id => (
            <li key={id}>
                <Link to={`/post/${id}`}>{entities[id].title}</Link>
            </li>
        ))                       // entitites is set as the lookup object to find the specific post of user.
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section>
            <h2>{user?.name}</h2>

            <ol>{content}</ol>
        </section>
    )
}

export default UserPage