package com.study.appstore.models.utils;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.domain.Page;

public class PageRenderDTO<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    private List<?> content;
    private long totalElements;
    private int numberOfElements;
    private int size;
    private int totalPages;
    private boolean hasPrevious;
    private boolean hasNext;
    private boolean first;
    private boolean last;
    private boolean empty;

    public PageRenderDTO(Page<T> page) {
        this.content = page.getContent();
        this.totalElements = page.getTotalElements();
        this.numberOfElements = page.getNumberOfElements();
        this.size = page.getSize();
        this.totalPages = page.getTotalPages();
        this.hasPrevious = page.hasPrevious();
        this.hasNext = page.hasNext();
        this.first = page.isFirst();
        this.last = page.isLast();
        this.empty = page.isEmpty();
    }

    public PageRenderDTO() {
    }

    public PageRenderDTO(List<?> content, long totalElements, int numberOfElements, int size, int totalPages,
            boolean hasPrevious, boolean hasNext, boolean first, boolean last, boolean empty) {
        this.content = content;
        this.totalElements = totalElements;
        this.numberOfElements = numberOfElements;
        this.size = size;
        this.totalPages = totalPages;
        this.hasPrevious = hasPrevious;
        this.hasNext = hasNext;
        this.first = first;
        this.last = last;
        this.empty = empty;
    }

    public List<?> getContent() {
        return this.content;
    }

    public void setContent(List<?> content) {
        this.content = content;
    }

    public long getTotalElements() {
        return this.totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getNumberOfElements() {
        return this.numberOfElements;
    }

    public void setNumberOfElements(int numberOfElements) {
        this.numberOfElements = numberOfElements;
    }

    public int getSize() {
        return this.size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getTotalPages() {
        return this.totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public boolean getHasPrevious() {
        return this.hasPrevious;
    }

    public void setHasPrevious(boolean hasPrevious) {
        this.hasPrevious = hasPrevious;
    }

    public boolean getHasNext() {
        return this.hasNext;
    }

    public void setHasNext(boolean hasNext) {
        this.hasNext = hasNext;
    }

    public boolean getFirst() {
        return this.first;
    }

    public void setFirst(boolean first) {
        this.first = first;
    }

    public boolean getLast() {
        return this.last;
    }

    public void setLast(boolean last) {
        this.last = last;
    }

    public boolean getEmpty() {
        return this.empty;
    }

    public void setEmpty(boolean empty) {
        this.empty = empty;
    }

    @Override
    public String toString() {
        return "{" + " content='" + getContent() + "'" + ", totalElements='" + getTotalElements() + "'"
                + ", numberOfElements='" + getNumberOfElements() + "'" + ", size='" + getSize() + "'" + ", totalPages='"
                + getTotalPages() + "'" + ", hasPrevious='" + getHasPrevious() + "'" + ", hasNext='" + getHasNext()
                + "'" + ", first='" + getFirst() + "'" + ", last='" + getLast() + "'" + ", empty='" + getEmpty() + "'"
                + "}";
    }

}
