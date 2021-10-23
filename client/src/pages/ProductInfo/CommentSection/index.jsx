import './CommentSection.scss';
import React, { useRef, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../../recoil/userState';
import { toastDisplayState } from '../../../recoil/toastDisplayState';
import { useQuery } from 'react-query';
import Comment from './Comment';
import commentApi from '../../../apis/commentApi';

function CommentSection() {
  const { pathname: url } = useLocation();
  const { id: productId } = useParams();

  const user = useRecoilValue(userState);

  const setToastDisplay = useSetRecoilState(toastDisplayState);

  const buttonsRef = useRef(null);
  const commentBoxRef = useRef(null);

  const { data: comments, refetch } = useQuery('comments', async () => {
    const params = { productId }
    const response = await commentApi.getAllByProductId(params);
    // console.log(response)
    return response;
  });

  useEffect(() => {
    refetch();
  }, [url]);

  const handleCommentBoxFocus = () => {
    buttonsRef.current.classList.add('active');
  }

  const handleCancelClick = () => {
    commentBoxRef.current.innerText = '';
    buttonsRef.current.classList.remove('active');
  }

  const handleOnSubmit = () => {
    const commentContent = commentBoxRef.current.innerText.trim();

    if (!commentContent) return;

    if (!user.accessToken) {
      setToastDisplay({
        show: true,
        message: 'Vui lòng đăng nhập để sử dụng tính năng bình luận'
      });
      return;
    } else if (user.mute) {
      setToastDisplay({
        show: true,
        message: 'Bạn bị cấm sử dụng tính năng bình luận'
      });
      return;
    } else if (commentContent.length <= 6) {
      setToastDisplay({
        show: true,
        message: 'Bình luận quá ngắn'
      });
      return;
    }

    const comment = {
      user: user._id,
      content: commentContent,
      productId: productId
    }

    commentApi.add(comment).then(response => {
      // console.log(response.message);
      refetch();
      commentBoxRef.current.innerText = '';
    }).then(error => {
      console.log(error);
    })
  }

  const handleEnterPress = (e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      handleOnSubmit();
    }
  }

  const isAdmin = user.type === 1;

  return (
    <React.Fragment>
      {comments && <div className="comment-section">
        <div className="title">Đánh giá ({comments.length})</div>

        <div className="comment-posting-area">
          <div className="comment-typing-area">
            <div className={isAdmin ? "avatar admin-mode" : "avatar"}>
              <div className="text-avatar">
                {user.accessToken ? (user.type === 1 ? 'Z' : user.name.split(" ").pop().charAt(0)) : 'P'}
              </div>
            </div>
            <div
              contentEditable="true"
              className="comment-typing"
              data-placeholder="Hãy cho chúng tôi biết cảm nghĩ của bạn..."
              onFocus={handleCommentBoxFocus}
              onKeyDown={handleEnterPress}
              ref={commentBoxRef}
            />
          </div>

          <div className="btn-group" ref={buttonsRef}>
            <div className="cancel-btn" onClick={handleCancelClick}>Hủy</div>
            <div className="submit-btn" onClick={handleOnSubmit}>Bình luận</div>
          </div>
        </div>

        <div className="comment-display-area">
          {[...comments].reverse().map(comment => (
            <Comment
              key={comment._id}
              commentId={comment._id}
              comment={comment}
              refetch={refetch}
            />
          ))}
        </div>
      </div>}
    </React.Fragment>
  );
}

export default CommentSection;