const TYPES = {
  /**
   * UseCase symbols for dependency injection.
   */
  IGetPostHandler: Symbol.for('IGetPostHandler'),
  ICreatePostHandler: Symbol.for('ICreatePostHandler'),
  IUpdatePostHandler: Symbol.for('IUpdatePostHandler'),
  IDeletePostHandler: Symbol.for('IDeletePostHandler'),
  ICreatePostLikeHandler: Symbol.for('ICreatePostLikeHandler'),
  IDeletePostLikeHandler: Symbol.for('IDeletePostLikeHandler'),
  IGetTimeLinePostsHandler: Symbol.for('IGetTimeLinePostsHandler'),
  IGetTimelineAllPostsHandler: Symbol.for('IGetTimelineAllPostsHandler'),
  IGetUserHandler: Symbol.for('IGetUserHandler'),
  IUpdateUserHandler: Symbol.for('IUpdateUserHandler'),
  IDeleteUserHandler: Symbol.for('IDeleteUserHandler'),
  ICreateFollowerHandler: Symbol.for('ICreateFollowerHandler'),
  IDeleteFollowerHandler: Symbol.for('IDeleteFollowerHandler'),
  ILoginHandler: Symbol.for('ILoginHandler'),
  IRegisterHandler: Symbol.for('IRegisterHandler'),
  IGetRecommendUserHandler: Symbol.for('IGetRecommendUserHandler'),

  /**
   * Service symbols for dependency injection.
   */
  IPostService: Symbol.for('IPostService'),
  IUserService: Symbol.for('IUserService'),

  /**
   * Repository symbols for dependency injection.
   */
  IPostRepository: Symbol.for('IPostRepository'),
  ILikeRepository: Symbol.for('ILikeRepository'),
  IUserRepository: Symbol.for('IUserRepository'),
  IFollowRepository: Symbol.for('IFollowRepository'),
} as const

export default TYPES
