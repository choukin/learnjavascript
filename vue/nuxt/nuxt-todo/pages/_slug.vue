<template>
	<section class="todoapp">
		<todo-header/>
		<!-- This section should be hidden by default and shown when there are todos -->
			<section class="main" v-if="todos.length">
				<input class="toggle-all" type="checkbox" id="toggle-all" >
				<label for="toggle-all" @click="allDone">Mark all as complete</label>
				<ul class="todo-list" >
					<!-- These are here just to show the structure of the list items -->
					<!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
					<li v-for="todo in todos" :class="{'completed':todo.completed, 'editing': todo === editedTodo}" >
						<div class="view">
							<input class="toggle" type="checkbox" v-model="todo.completed">
							<label @dblclick="editTodo(todo)">{{todo.title}}</label>
							<button class="destroy" @click="removeTodo(todo)"></button>
						</div>
						<input class="edit" type="text" v-model="todo.title"  v-todo-focus="todo == editedTodo"
						@blur="doneEdit(todo)"
						@keyup.enter="doneEdit(todo)"
						@keyup.esc="cancelEdit(todo)">
					</li>
				</ul>
			</section>
		<todo-footer/>
	</section>
</template>
<script>
	import TodoHeader from '~components/header'
	import TodoFooter from '~components/footer'
	export default {
		validate ({params}) {
			return !params.slug || params.slug === 'active' || params.slug === 'completed'
		},
		heade (){
			return {
				title: this.$route.params.slug || 'all',
				titleTemplate: 'Nuxt TodoMvc:%s todos'
			}
		},
		data () {
			return {
				editedTodo: null
			}
		},
		computed: {
			todos () {
				if (this.$route.params.slug === 'active'){
					return this.$store.getters.activeTodos
				}
				if(this.$route.params.slug === 'completed'){
					return this.$store.getters.completedTodos
				}
				return this.$store.getters.allTodos
			}	
		},
		watch:{
		todos:{
			deep:true,
			handler:'save'
		}

		},
		methods: {
			allDone(){
				this.$store.dispatch('allDone')
			},
			editTodo (todo){
				this.beforeEditCatch = todo.title
				this.editedTodo = todo
			},
			doneEdit (todo) {
				this.editedTodo = null
				todo.title = todo.title.trime()
				if(!todo.title){
					this.$store.dispatch('removeTodo',todo)
				}
			},
			cancelEdit (todo) {
				this.editedTodo = null
				todo.title = this.beforeEditCatch
			},
			removeTodo (todo){
				this.$store.dispatch('removeTodo',todo)
			},
			save() {
				this.$store.dispatch('saveTodos')
			}
		},
		directives:{
			'todo-focus' (el, binding) {
				if( binding.value) {
					el.focus()
				}
			}
		},
		components: {
			TodoHeader,
			TodoFooter
		}
	}
</script>