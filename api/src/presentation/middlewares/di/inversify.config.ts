import { Container } from 'inversify'
import TYPES from './symbol'
import { PostService } from '@/domain/services/postService'
import { IPostService } from '@/domain/interfaces/services/IPostService'
import { IPostRepository } from '@/domain/interfaces/repositories/IPostRepository'
import { PostRepository } from '@/infrastructure/repositories/postRepository'
import { IGetPostHandler } from '@/application/useCase/post/getPost/IGetPostHandler'
import { GetPostHandler } from '@/application/useCase/post/getPost/getPostHandler'
import { ICreatePostHandler } from '@/application/useCase/post/createPost/ICreatePostHandler'
import { CreatePostHandler } from '@/application/useCase/post/createPost/createPostHandler'
import { IUpdatePostHandler } from '@/application/useCase/post/updatePost/IUpdatePostHandler'
import { UpdatePostHandler } from '@/application/useCase/post/updatePost/updatePostHandler'
import { IDeletePostHandler } from '@/application/useCase/post/deletePost/IDeletePostHandler'
import { DeletePostHandler } from '@/application/useCase/post/deletePost/deletePostHandler'
import { ICreatePostLikeHandler } from '@/application/useCase/post/createPostLike/ICreatePostLikeHandler'
import { CreatePostLikeHandler } from '@/application/useCase/post/createPostLike/createPostLikeHandler'
import { LikeRepository } from '@/infrastructure/repositories/likeRepository'
import { ILikeRepository } from '@/domain/interfaces/repositories/ILikeRepository'
import { IDeletePostLikeHandler } from '@/application/useCase/post/deletePostLike/IDeletePostLikeHandler'
import { DeletePostLikeHandler } from '@/application/useCase/post/deletePostLike/deletePostLikeHandler'
import { IUserRepository } from '@/domain/interfaces/repositories/IUserRepository'
import { UserRepository } from '@/infrastructure/repositories/userRepository'
import { FollowRepository } from '@/infrastructure/repositories/followRepository'
import { IFollowRepository } from '@/domain/interfaces/repositories/IFollowRepository'
import { GetTimeLinePostsHandler } from '@/application/useCase/post/getTimeLinePosts/getTimeLinePostsHandler'
import { IGetTimelineAllPostsHandler } from '@/application/useCase/post/getTimelineAllPosts/IGetTimelineAllPostsHandler'
import { GetTimelineAllPostsHandler } from '@/application/useCase/post/getTimelineAllPosts/getTimelineAllPostsHandler'
import { IGetUserHandler } from '@/application/useCase/user/getUserHandler/IGetUserHandler'
import { GetUserHandler } from '@/application/useCase/user/getUserHandler/getUserHandler'
import { IUserService } from '@/domain/interfaces/services/IUserService'
import { UserService } from '@/domain/services/userService'
import { IUpdateUserHandler } from '@/application/useCase/user/updateUserHandler/IUpdateUserHandler'
import { UpdateUserHandler } from '@/application/useCase/user/updateUserHandler/updateUserHandler'
import { IDeleteUserHandler } from '@/application/useCase/user/deleteUserHandler/IDeleteUserHandler'
import { DeleteFollowerHandler } from '@/application/useCase/user/deleteFollowerHandler/deleteFollowerHandlerHandler'
import { ICreateFollowerHandler } from '@/application/useCase/user/createFollowerHandler/ICreateFollowerHandler'
import { CreateFollowerHandler } from '@/application/useCase/user/createFollowerHandler/createFollowerHandler'
import { DeleteUserHandler } from '@/application/useCase/user/deleteUserHandler/deleteUserHandler'
import { IDeleteFollowerHandler } from '@/application/useCase/user/deleteFollowerHandler/IDeleteFollowerHandlerHandler'
import { ILoginHandler } from '@/application/useCase/auth/login/ILoginHandler'
import { LoginHandler } from '@/application/useCase/auth/login/loginHandler'
import { IRegisterHandler } from '@/application/useCase/auth/register/IRegisterHandler'
import { RegisterHandler } from '@/application/useCase/auth/register/registerHandler'

/**
 * DIコンテナの設定
 */
const diContainer = new Container()
/**
 * UseCase symbols for dependency injection.
 */
diContainer.bind<IGetPostHandler>(TYPES.IGetPostHandler).to(GetPostHandler)
diContainer.bind<ICreatePostHandler>(TYPES.ICreatePostHandler).to(CreatePostHandler)
diContainer.bind<IUpdatePostHandler>(TYPES.IUpdatePostHandler).to(UpdatePostHandler)
diContainer.bind<IDeletePostHandler>(TYPES.IDeletePostHandler).to(DeletePostHandler)
diContainer.bind<ICreatePostLikeHandler>(TYPES.ICreatePostLikeHandler).to(CreatePostLikeHandler)
diContainer.bind<IDeletePostLikeHandler>(TYPES.IDeletePostLikeHandler).to(DeletePostLikeHandler)
diContainer
  .bind<GetTimeLinePostsHandler>(TYPES.IGetTimeLinePostsHandler)
  .to(GetTimeLinePostsHandler)
diContainer
  .bind<IGetTimelineAllPostsHandler>(TYPES.IGetTimelineAllPostsHandler)
  .to(GetTimelineAllPostsHandler)
diContainer.bind<IGetUserHandler>(TYPES.IGetUserHandler).to(GetUserHandler)
diContainer.bind<IUpdateUserHandler>(TYPES.IUpdateUserHandler).to(UpdateUserHandler)
diContainer.bind<IDeleteUserHandler>(TYPES.IDeleteUserHandler).to(DeleteUserHandler)
diContainer.bind<ICreateFollowerHandler>(TYPES.ICreateFollowerHandler).to(CreateFollowerHandler)
diContainer.bind<IDeleteFollowerHandler>(TYPES.IDeleteFollowerHandler).to(DeleteFollowerHandler)
diContainer.bind<ILoginHandler>(TYPES.ILoginHandler).to(LoginHandler)
diContainer.bind<IRegisterHandler>(TYPES.IRegisterHandler).to(RegisterHandler)

/**
 * Service symbols for dependency injection.
 */
diContainer.bind<IPostService>(TYPES.IPostService).to(PostService)
diContainer.bind<IUserService>(TYPES.IUserService).to(UserService)

/**
 * Repository symbols for dependency injection.
 */
diContainer.bind<IPostRepository>(TYPES.IPostRepository).to(PostRepository)
diContainer.bind<ILikeRepository>(TYPES.ILikeRepository).to(LikeRepository)
diContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository)
diContainer.bind<IFollowRepository>(TYPES.IFollowRepository).to(FollowRepository)

export { diContainer }
