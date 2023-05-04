package com.reddit.reddit.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.reddit.reddit.dto.VoteDto;
import com.reddit.reddit.exceptions.PostNotFoundException;
import com.reddit.reddit.exceptions.SpringRedditException;
import com.reddit.reddit.model.Post;
import com.reddit.reddit.model.Vote;
import com.reddit.reddit.model.VoteType;
import com.reddit.reddit.repository.PostRepository;
import com.reddit.reddit.repository.VoteRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VoteService {
    private final VoteRepository voteRepository;
    private final PostRepository postRepository;
    private final AuthService authService;

    public void vote(VoteDto voteDto) {
        Post post = postRepository.findById(voteDto.getPostId())
                .orElseThrow(
                        () -> new PostNotFoundException("Post not found with id" + voteDto.getPostId().toString()));
        Optional<Vote> voteByPostAndUser = voteRepository.findTopByPostAndUserOrderByVoteIdDesc(post,
                authService.getCurrentUser());
        if (voteByPostAndUser.isPresent() && voteByPostAndUser.get().getVoteType().equals(voteDto.getVoteType())) {
            throw new SpringRedditException("You have alrady " + voteDto.getVoteType() + "'d for this post");
        }
        if (VoteType.UPVOTE.equals(voteDto.getVoteType())) {
            post.setVoteCount(post.getVoteCount() + 1);
        } else {
            post.setVoteCount(post.getVoteCount() - 1);
        }
        voteRepository.save(mapToVote(voteDto, post));
        postRepository.save(post);

    }

    private Vote mapToVote(VoteDto voteDto, Post post) {
        return Vote.builder()
                .voteType(voteDto.getVoteType())
                .post(post)
                .user(authService.getCurrentUser())
                .build();
    }
}
