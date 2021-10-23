import './Comment.scss';
import React, { useRef, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../../../recoil/userState';
import { dialogState } from '../../../../recoil/dialogState';
import { toastDisplayState } from '../../../../recoil/toastDisplayState';
import { useParams } from "react-router-dom";
import commentApi from '../../../../apis/commentApi';
import userApi from '../../../../apis/userApi';

function Comment({ comment, refetch, commentId, reply = false, parentId }) {
  const { id: productId } = useParams();
  const user = useRecoilValue(userState);

  const setToastDisplay = useSetRecoilState(toastDisplayState);
  const setDialog = useSetRecoilState(dialogState);

  const replyBoxRef = useRef(null);
  const replyCommentBoxRef = useRef(null);
  const timeAgoRef = useRef();

  const date = new Date(comment.date);
  timeAgoRef.current = timeSince(date);

  const handleOnSubmit = () => {
    const commentContent = replyCommentBoxRef.current.innerText.trim();

    if (commentContent) {
      const subComment = {
        user: user._id,
        content: commentContent,
        productId: productId
      }

      const params = {
        reply: 1,
        id: commentId
      }

      commentApi.add(subComment, params).then(response => {
        // console.log(response.message);
        replyCommentBoxRef.current.innerText = '';
        replyBoxRef.current.classList.remove('active');
        refetch();
      }).catch(error => {
        console.log(error.response.data.message);
      })
    }
  }

  const handleEnterPress = (e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      handleOnSubmit();
    }
  }

  const handleCancelClick = () => {
    replyCommentBoxRef.current.innerText = '';
    replyBoxRef.current.classList.remove('active');
  }

  const handleReplyClick = () => {
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
    }
    replyBoxRef.current.classList.add('active');
    replyCommentBoxRef.current.focus();
  }

  const handleDeleteComment = () => {
    setDialog({
      show: true,
      message: 'Bạn có chắc muốn xóa bình luận này?',
      acceptButtonName: 'Xóa',
      func: () => {
        let params = {};
        if (reply) {
          params = {
            id: parentId,
            node: commentId
          }
        } else {
          params = {
            id: commentId
          }
        }

        commentApi.delete(params).then(response => {
          // console.log(response.message);
          refetch();
        }).catch(error => {
          console.log(error);
        })
      }
    });
  }

  const handleMuteUser = () => {
    const keyword = comment.user.mute ? 'bỏ cấm' : 'cấm';

    const data = {
      id: comment.user._id,
      mute: !comment.user.mute
    }

    setDialog({
      show: true,
      message: `Bạn có chắc muốn ${keyword} người này bình luận?`,
      acceptButtonName: keyword,
      func: () => {
        userApi.updateMute(data).then(response => {
          console.log(response.message);
          refetch();
        }).catch(error => {
          console.log(error.response.data.message);
        })
      }
    })
  }

  useEffect(() => {
    const timeAgo = setInterval(() => {
      timeAgoRef.current = timeSince(date);
    }, 1000);

    return () => clearInterval(timeAgo);
  }, [])

  const isAdmin = user.type === 1;
  const isAdminComment = comment.user.type === 1;

  return (
    <div className="comment">
      <div className={reply ? "reply-comment" : "original-comment"}>
        <div className={isAdminComment ? "avatar admin-mode" : "avatar"}>
          <div className="text-avatar">
            {isAdminComment ? 'Z' : comment.user.name.split(" ").pop().charAt(0)}
          </div>
        </div>
        <div className="comment-content">
          <div className="author">{isAdminComment ? 'ZShop - Quà tặng & Phụ kiện thời trang' : comment.user.name}</div>
          <div className="content">{comment.content}</div>
          <div className="control-options">
            {!reply && <span className="reply-btn" onClick={handleReplyClick}>Trả lời</span>}
            {isAdmin && <span className="delete-btn" onClick={handleDeleteComment}>Xóa</span>}
            {isAdmin && !isAdminComment && <span className="mute-btn" onClick={handleMuteUser}>{comment.user.mute ? 'Bỏ cấm' : 'Cấm'}</span>}
            <span className="time-ago">{timeAgoRef.current}</span>
          </div>
        </div>
      </div>

      {user.accessToken && <div className="reply-typing-area" ref={replyBoxRef}>
        <div className="comment-typing-area">
          <div className={isAdmin ? "avatar admin-mode" : "avatar"}>
            <div className="text-avatar">
              {isAdmin ? 'Z' : user.name.split(" ").pop().charAt(0)}
            </div>
          </div>
          <div
            contentEditable="true"
            className="comment-typing"
            data-placeholder="Nhập câu trả lời..."
            onKeyDown={handleEnterPress}
            ref={replyCommentBoxRef}
          />
        </div>

        <div className="btn-group">
          <div className="cancel-btn" onClick={handleCancelClick}>Hủy</div>
          <div className="submit-btn" onClick={handleOnSubmit}>Trả lời</div>
        </div>
      </div>}

      {comment.reply && comment.reply.map(reply => (
        <Comment
          key={reply._id}
          commentId={reply._id}
          comment={reply}
          parentId={commentId}
          refetch={refetch}
          reply
        />
      ))}
    </div>
  );
}

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " năm trước";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " tháng trước";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " ngày trước";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " giờ trước";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " phút trước";
  }
  // return Math.floor(seconds) + " giây trước";
  return "Vừa xong";
}

export default Comment;