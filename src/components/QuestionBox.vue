<template>
  <div class="my-4">
    <b-jumbotron >
      <template v-slot:lead>
       {{ currentQuestion.question }}
      </template>
      <hr class="my-4">
      <b-list-group class="pb-4">
        <b-list-group-item
          :class="answerClass(index)"
          v-for="(answer, index) in answers"
          :key="index"
          @click="selectAnswer(index)">
         {{ answer }}
        </b-list-group-item>
      </b-list-group>
      <b-button 
        class="mx-2" 
        variant="primary"
        @click="submitAnswer"
        :disabled="selectIndex === null || answered "
        >

        Submit</b-button>
      <b-button 
        variant="success" 
        href="#"
        @click="next"
        >Next</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    currentQuestion: {},
    next: Function,
    increment: Function //like PropType in reactjs
  },
  data() {
    return {
      selectIndex: null,
      shuffledAnswers: [],
      correctIndex: null,
      answered: false
    }
  },
  methods: {
    selectAnswer(index) {
      this.selectIndex = index
    },
    shuffleAnswers() {
      let { currentQuestion } = this
      let answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
      this.shuffledAnswers = _.shuffle(answers)
      this.correctIndex = this.shuffledAnswers.indexOf(currentQuestion.correct_answer)
    },
    submitAnswer() {
      let isCorrect = false;
      if(this.selectIndex === this.correctIndex) {
        isCorrect = true;
      }
      this.answered = true
      this.increment(isCorrect)//props isCorrect from component father
    },
    answerClass(index) {
      let answerClass = '';
      if(!this.answered && this.selectIndex === index ) {
        answerClass = 'selected'
      } else if( this.answered && this.correctIndex === index) {
        answerClass = 'correct'
      } else if(this.answered && this.selectIndex === index && this.correctIndex !== index) {
        answerClass = 'incorrect'
      }
      return answerClass
    }
  },
  mounted() {
    this.shuffleAnswers()
  },
  watch: {// obj like data 
      currentQuestion: {
        immediate: true,//it alow watch run when initialization component mouted
        handler() {
          this.selectIndex = null
          this.answered = false
          this.shuffleAnswers()
        }
      }
  },
  computed: {
    answers() {
      let { currentQuestion } = this
      let answers = [...currentQuestion.incorrect_answers]
      answers.push(currentQuestion.correct_answer)
      return answers
      //return answers.push(this.currentQuestion.incorrect_answers)// return length array
    }
  }
}
</script>

<style scoped> 
.list-group-item {
  cursor: pointer;
}
.list-group-item:hover {
  background: rgb(197, 192, 192);
}
.selected {
  background-color: rgb(197, 192, 192);
}

.correct {
  background-color: green;
}

.incorrect {
  background-color: red;
}
</style>