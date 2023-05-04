package com.reddit.reddit.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reddit.reddit.dto.CommentsDto;
import com.reddit.reddit.service.CommentService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/comment")
@AllArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public CommentsDto save(@RequestBody CommentsDto commentsDto) {
        return commentService.save(commentsDto);
    }

    @GetMapping("/by-post/{id}")
    public List<CommentsDto> getByPost(@PathVariable Long id) {
        return commentService.getByPost(id);
    }

}
