package com.reddit.reddit.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.reddit.reddit.dto.CommentsDto;
import com.reddit.reddit.exceptions.PostNotFoundException;
import com.reddit.reddit.mapper.CommentMapper;
import com.reddit.reddit.model.Comment;
import com.reddit.reddit.model.NotificationEmail;
import com.reddit.reddit.model.Post;
import com.reddit.reddit.model.User;
import com.reddit.reddit.repository.CommentRepository;
import com.reddit.reddit.repository.PostRepository;
import com.reddit.reddit.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CommentService {
        private static final String POST_URL = "";
        private final CommentMapper commentMapper;
        private final PostRepository postRepository;
        private final UserRepository userRepository;
        private final CommentRepository commentRepository;
        private final MailContentBuilder mailContentBuilder;
        private MailService mailService;
        private final AuthService authService;

        @Transactional
        public CommentsDto save(CommentsDto commentsDto) {
                Post post = postRepository.findById(commentsDto.getPostId())
                                .orElseThrow(() -> new PostNotFoundException(commentsDto.getPostId().toString()));
                User user = userRepository.findByUsername(commentsDto.getUserName())
                                .orElseThrow(() -> new UsernameNotFoundException(commentsDto.getUserName()));
                Comment comment = commentMapper.map(commentsDto, post, user);
                Comment save = commentRepository.save(comment);
                String message = mailContentBuilder
                                .build(authService.getCurrentUser().getUsername() + " posted a comment on your post."
                                                + POST_URL);
                sendCommentNotification(message, post.getUser());
                return commentMapper.mapToDto(save);
        }

        private void sendCommentNotification(String message, User user) {
                mailService.sendMail(new NotificationEmail(user.getUsername() + " Commented on your post",
                                user.getEmail(), message));
        }

        @Transactional
        public List<CommentsDto> getByPost(Long id) {
                Post post = postRepository.findById(id)
                                .orElseThrow(() -> new PostNotFoundException(id.toString()));
                return commentRepository.findByPost(post)
                                .stream()
                                .map(commentMapper::mapToDto)
                                .collect(Collectors.toList());
        }

}
